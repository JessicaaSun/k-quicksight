import React from "react";

export default function JupiterDoc() {
    return (
        <div className="h-full">
            <iframe
                className={"min-w-full min-h-screen"}
                src="https://photostad-api.istad.co/api/v1/jupyter/notebook/82c3bbb31229421895f03fb75feac4ab.html/"
                title="Jupyter Notebook"
                height={"100%"}
            />


        </div>
    );
}
