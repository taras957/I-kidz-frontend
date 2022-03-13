export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  //   if (req.query.secret !== process.env.MY_REVALIDATE_TOKEN) {
  //     return res.status(401).json({ message: 'Invalid revalidate token' });
  //   }
  console.log(res, 'HEREEEEE');
  try {
    await res.unstable_revalidate('/');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err, 'HEREEEEE');

    return res.status(500).send('Error revalidating');
  }
}
