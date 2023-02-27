import { StyledBtn } from './LoadMoreButton.styled';

const LoadMoreBtn = ({ onBtnClick }) => {
  return (
    <StyledBtn type="button" onClick={onBtnClick}>
      Load more
    </StyledBtn>
  );
};

export default LoadMoreBtn;
