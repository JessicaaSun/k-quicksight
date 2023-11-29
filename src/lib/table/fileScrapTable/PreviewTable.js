import React from "react";
import {useScrappingUrlQuery} from "@/store/features/scrappingData/scrappingUrl";
import {Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

export default function PreviewTable({detail}) {
    const {data:fileDetail, isLoading} = useScrappingUrlQuery({filename: detail});

    return (
        <div className={'w-full'}>
            {
                isLoading ? <Spinner size={'md'} /> : (
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            {
                                fileDetail?.header.map((item) => (
                                    <TableColumn key={item}>{item}</TableColumn>
                                ))
                            }
                        </TableHeader>
                        <TableBody>
                            {
                                fileDetail?.data.map((item, index) => (
                                    <TableRow key={index}>
                                        {
                                            fileDetail.header.map((item_header, index) => (
                                                <TableCell key={index}>
                                                    {
                                                        item[item_header]
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                )
            }
        </div>
    );
}
