const { Router } =  require('express');

const router = Router();

router.post('/login', async (req, res) => {
  try {
 
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;