import { data } from '../data';
import { DesignFrame } from '@lidojs/editor';

const EditorContent = () => {
    return <DesignFrame data={data} />;
};

export default EditorContent;
