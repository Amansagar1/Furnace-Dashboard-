// 'use client';
// import React, { useState } from 'react';
// import Navbar from '@/Components/Header/Navbar';
// import Sidebar from '@/Components/Sidebar/Sidebar';
// import Dashboard from '@/Components/DashboardComponent/Dashboard';

// const DashboardPage = ({ params }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isCollapsed, setIsCollapsed] = useState(false);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//             <Sidebar
//                 isOpen={isSidebarOpen}
//                 isCollapsed={isCollapsed}
//                 onCollapse={setIsCollapsed}
//                 currentPath={params?.slug?.[0]}
//             />
//             <main className={`pt-16 transition-all duration-300 
//                 ${isSidebarOpen
//                     ? (isCollapsed ? 'ml-16' : 'ml-64')
//                     : 'ml-0'}`}>
//                 <Dashboard params={params} />
//             </main>
//         </div>
//     );
// };

// export default DashboardPage;



'use client';
import React, { useState } from 'react';
import Navbar from '@/Components/Header/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Dashboard from '@/Components/DashboardComponent/Dashboard';

const DashboardPage = ({ params }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        // <div className="min-h-screen bg-gray-50">
        //     <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        //     <Sidebar
        //         isOpen={isSidebarOpen}
        //         isCollapsed={isCollapsed}
        //         handleCollapse={handleCollapse}
        //         currentPath={params?.slug?.[0]}
        //     />
        //     <main className={`pt-16 transition-all duration-300 
        //         ${isSidebarOpen
        //             ? (isCollapsed ? 'ml-16' : 'ml-64')
        //             : 'ml-0'}`}>
        //         <Dashboard params={params} />
        //     </main>
        // </div>
        <div className="min-h-screen bg-gray-50">
            <Dashboard params={params} />
        </div>
    );
};

export default DashboardPage;