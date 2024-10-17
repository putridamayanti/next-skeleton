import SidebarGroup from "layouts/app/components/sidebar/SidebarGroup";
import SidebarItem from "layouts/app/components/sidebar/SidebarItem";
import SidebarSectionTitle from "layouts/app/components/sidebar/SidebarSectionTitle";
import useProfile from "hooks/useProfile";

export default function SidebarItems(props) {
    const { items, parent, themeConfig } = props;
    const profile = useProfile();

    const renderItemsComponent = items.map((e, i) => {
        if (e.roles?.length > 0) {
            if (!e.roles.find(item => item.value === profile?.role?.code)) {
                return null;
            }
        }

        if (e.children) return <SidebarGroup key={e.id} item={e} parent={parent} themeConfig={themeConfig}/>
        if (e.sectionTitle) return <SidebarSectionTitle key={i} title={e.sectionTitle}/>;

        return (
            <SidebarItem key={e.id} item={e} parent={parent} themeConfig={themeConfig}/>
        )
    });

    return <>{renderItemsComponent}</>
}