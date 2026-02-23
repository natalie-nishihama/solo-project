import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { modalStyle } from "../styles/modalStyle";

function EditModal({
  open,
  handleClose,
  handleUpdate,
  title,
  content,
  setTitle,
  setContent,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <h2>投稿編集</h2>
        <form onSubmit={handleUpdate}>
          <TextField
            fullWidth
            label="タイトル"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="内容"
            multiline
            rows={4}
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            更新
          </Button>

          <Button variant="outlined" onClick={handleClose}>
            キャンセル
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default EditModal;