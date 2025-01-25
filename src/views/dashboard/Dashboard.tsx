import Navbar from '../../components/navbar/Navbar';
import './dashboard.scss';
import { FaUsers, FaUserCog } from "react-icons/fa";
import { FaPersonHarassing } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';


interface DashboardProps {
    setShowDashboard: any;
    setShowEmployeeOverview: any;
    setShowUserDetail: any;
    setShowUserOverview: any;
}

const Dashboard = (props: DashboardProps) => {
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const userRole = auth.userRole;

    const gotoEmployeeOverview = () => {
        props.setShowDashboard(false);
        props.setShowUserOverview(false);
        props.setShowEmployeeOverview(true);
    }

    const gotoUserDetailOverview = () => {
        props.setShowDashboard(false);
        props.setShowUserOverview(false);
        props.setShowUserDetail(true);
    }

    const gotoUserOverview = () => {
        props.setShowDashboard(false);
        props.setShowUserDetail(false);
        props.setShowUserOverview(true);
    }


    return (
        <>
            <Navbar />
            <div className='dashboard'>
                <h1>Dashboard</h1>

                <div className='goto-cards-cointainer'>
                    <div className='goto-card' onClick={gotoEmployeeOverview}>
                        <h2>
                            <FaPersonHarassing />
                        </h2>
                        <button>Go to employee overview</button>
                    </div>
                    {userRole !== 'employee' && (
                        <div className='goto-card' onClick={gotoUserOverview}>
                            <h2>
                                <FaUsers />
                            </h2>
                            <button>Go to user overview</button>
                        </div>
                    )}
                    <div className='goto-card' onClick={gotoUserDetailOverview}>
                        <h2><FaUserCog />                        </h2>
                        <button>Go to your detail</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Dashboard;