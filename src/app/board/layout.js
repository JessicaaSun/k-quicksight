
import React from 'react';
import Sidebar from "@/app/board/components/sidebar";
export default function BoardRootLayout ({children}){
    return (
        <section>
            <Sidebar />
            {children}
        </section>
    )
}