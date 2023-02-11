
export const RegisterSociety = async (req, res) => {
  const { email, password } = req.body;
  try {
   
    res.json({ success: true, data: { message:"registed working",email,password } });
  } catch (err) {
    serverError(res, err);
  }
};

