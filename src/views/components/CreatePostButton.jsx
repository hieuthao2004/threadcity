const CreatePostButton = ({ onClick }) => {
  return (
    <div className="create-post">
      <div className="create-post-input" onClick={onClick}>
        <span className="create-post-placeholder">What's on your mind?</span>
      </div>
    </div>
  );
};

export default CreatePostButton;
