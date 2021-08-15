// import { Request, Response } from 'express';
//
// const getTweets = async (req: Request, res: Response) => {
//   const username = req.query.username;
//   if (username && typeof username !== 'string') {
//     return res.status(403).json({ message: 'username is invalid' });
//   }
//   const tweets = await (username
//     ? tweetService.getTweetsByUsername(username)
//     : tweetService.getTweets());
//   res.status(200).json(tweets ?? []);
// };
