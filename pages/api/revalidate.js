export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_PUBLIC_MY_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid revalidate token' });
  }
  try {
    await res.unstable_revalidate(req.query.path);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page

    return res.status(500).send('Error revalidating');
  }
}
