import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Tweet CRUD

// Create Tweet
router.post('/', async (req, res) => {
  const { tittle, content, image, userId } = req.body;

  console.log('Request Body:', req.body);

  try {
    const result = await prisma.tweet.create({
      data: {
        tittle,
        content,
        image,
        userId
      },
    });

    res.json(result);
  } catch (e) {
    console.error('Error creating tweet: ', e)
    res.status(400).json({ error: 'Failed to create tweet' });
  }
});

// list Tweet
router.get('/listTweet', async (req, res) => {
  const allTweets = await prisma.tweet.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  res.json(allTweets);
});

// get one Tweet id
router.get('/getTweet/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Query tweet with id: ', id);

  const tweet = await prisma.tweet.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
  if (!tweet) {
    return res.status(404).json({ error: 'Tweet not found!' });
  }

  res.json(tweet);
});

//get tweet by user
router.get('/getTweetsByUser/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      const userTweets = await prisma.tweet.findMany({
          where: { userId: Number(userId) },
          include: { user: true },
      });
      res.json(userTweets);
  } catch (error) {
      console.error("Error fetching user tweets:", error);
      res.status(500).json({ error: 'Failed to fetch user tweets' });
  }
});


// update Tweet
router.put('/updateTweet/:id', async(req, res) => {
  const { id } = req.params;
  const { tittle, content, image, userId } = req.body;

  try {
    const result = await prisma.tweet.update({
      where: { id: Number(id) },
      data: { tittle, content, image, userId },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: `Failed to update the tweet` });
  }
});

// delete Tweet
router.delete('/deleteTweet/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.tweet.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default router;
