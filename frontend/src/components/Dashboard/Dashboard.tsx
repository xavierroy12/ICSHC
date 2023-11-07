import Alert from '@mui/material/Alert';

const Dashboard = () => {
    return (
        <div className='flex flex-col items-center space-y-4'>

            <br />
            <h1>Welcome to your dashboard!</h1>

            <Alert variant="filled" severity="error" className="w-1/2">
                This is an error alert
            </Alert>
            <Alert variant="filled" severity="warning" className="w-1/2">
                This is a warning alert
            </Alert>
            <Alert variant="filled" severity="info" className="w-1/2">
                This is an info alert
            </Alert>
            <Alert variant="filled" severity="success" className="w-1/2">
                This is a success alert
            </Alert>
        </div>
    );
};

export default Dashboard;
