import { data } from '../data';
import { DesignFrame } from '@lidojs/editor';

const EditorContent = ({dashboardData}) => {
    return <DesignFrame data={JSON.parse(dashboardData?.json_data)} />;
};

export default EditorContent;
