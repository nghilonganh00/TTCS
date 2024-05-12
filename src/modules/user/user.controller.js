import { handleGetUserById, handleUpdateUser } from './user.service';

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await handleGetUserById(id);

    return res.status(200).json({
      data: user,
      message: 'Update successfully user',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, dob, addressHome, addressWork, phone, introduction, avatar } = req.body;
    console.log('request body: ', req.body);

    const updatedUser = await handleUpdateUser(
      id,
      username,
      dob,
      introduction,
      avatar,
      phone,
      addressHome,
      addressWork,
    );

    return res.status(200).json({
      data: updatedUser,
      message: 'Update successfully user',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error,
    });
  }
};

export default { getById, updateUser };
