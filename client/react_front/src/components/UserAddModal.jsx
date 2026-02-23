import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { modalStyle } from "../styles/modalStyle";

function UserAddModal({
  open,
  handleClose,
  handleAddUser,
  newUserName,
  setNewUserName,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <h2>ユーザー追加</h2>
        <form onSubmit={handleAddUser}>
          <TextField
            fullWidth
            label="ユーザー名"
            margin="normal"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />

          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            追加
          </Button>

          <Button variant="outlined" onClick={handleClose}>
            キャンセル
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default UserAddModal;