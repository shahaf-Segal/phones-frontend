import PropTypes from "prop-types";
import Button from "../../../atoms/Button/Button";
import { Icon } from "../../../atoms/Icon";
EditDeleteBtn.propTypes = {
  editOnClick: PropTypes.func,
  deleteOnClick: PropTypes.func,
};

function EditDeleteBtn({ editOnClick, deleteOnClick }) {
  return (
    <div style={{ display: "flex" }}>
      <Button
        icon={<Icon name="EditBtnIcon" color="var(--light-text-color)" />}
        fullWidth={true}
        onClick={editOnClick}
      />
      <Button
        icon={<Icon name="DeleteIcon" color="var(--light-text-color)" />}
        fullWidth={true}
        onClick={deleteOnClick}
      />
    </div>
  );
}

export default EditDeleteBtn;
