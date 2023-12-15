import React from "react";

export default function JupiterDoc({filename}) {
    return (
        <div className="h-full">
            <iframe
                className={"min-w-full min-h-screen"}
                src={`https://photostad-api.istad.co/api/v1/jupyter/notebook/${filename}/`}
                title="Jupyter Notebook"
                height={"100%"}
            />


        </div>
    );
}
