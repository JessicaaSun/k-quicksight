import React from 'react';
import {useEdaFileMutation} from "@/store/features/ExploreData/ExploreData";
import {Button, Spinner} from "@nextui-org/react";
import {getRandomColor} from "@/utils/util";

const Visualization = ({bodyEda}) => {

    const [edaFile] = useEdaFileMutation();

    const handleEda = async () => {
        const response = await edaFile({data: bodyEda})
        console.log(response)
    }

    return (
        <div>

            <div>
                <span>You chosen to perform EDA of </span>
                {
                    bodyEda?.visualizes.map((item, index) => (
                        <span className={'mx-3 p-2 rounded-xl'} key={index} style={{ backgroundColor: getRandomColor(), color: "white"}}>
                          {item}{' '}
                        </span>
                    ))
                }
            </div>
            {/*<Button onClick={handleEda} >Perform EDA</Button>*/}
        </div>
    );
};

export default Visualization;