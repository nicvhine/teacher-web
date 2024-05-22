router.get('/protected-route', authenticateToken, (req, res) => {
  // This route is protected by authentication
  res.json({ message: 'Access granted' });
});
