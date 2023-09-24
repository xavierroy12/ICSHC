import { useLocation } from 'react-router-dom';


const ModifyActifs = () => {

const location = useLocation();
  const { selectedRows } = location.state;
  // TODO: Implement Modify Actifs page
  console.log(selectedRows)
  return (
    <div>
      <h2>Modify Actifs</h2>
      {/* TODO: Add form for modifying actifs */}
    </div>
  );
};



export default ModifyActifs;