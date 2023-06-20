import { AppShell } from '@mantine/core';

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import SidebarCollapsed from './Sidebar/SidebarCollapsed';
import Headerbar from './HeaderBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <AppShell
          padding="md"
          layout="alt"
          navbar={
                collapsed ? (<Sidebar handleCollapse={handleCollapse} />) : (
                    <SidebarCollapsed handleCollapse={handleCollapse} />)

            }
          header={<Headerbar />}
          styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}

        >
            {children}
        </AppShell>
    );
};

export default DashboardLayout;
