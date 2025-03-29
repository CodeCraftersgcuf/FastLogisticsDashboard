import React from "react";

interface TableCanProps<T> {
    heading?: string;
    ButtonName?: string;
    ButtonLink?: string;
    headerTr: string[];
    dataTr: T[];
    TrName: React.ComponentType<any>;
    showHeading?: boolean;
    TrPropsName?: Record<string, any>;
}

const TableCan = <T,>({
    heading,
    headerTr,
    dataTr,
    TrName,
    showHeading = false,
    TrPropsName = {}
}: TableCanProps<T>) => {
    console.log(dataTr, " : tablecan datetr");
    return (
        <div className="rounded-xl bg-white shadow-md shadow-gray-400 ">
            {showHeading && (
                <div className="flex items-center justify-between gap-2 p-4">
                    <h1 className="text-2xl font-semibold capitalize">{heading}</h1>
                </div>
            )}
            <div className="overflow-x-auto overflow-y-visible pb-8">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-200 text-black capitalize">
                        <tr>
                            <th className="p-2 py-4 w-10">
                                <input type="checkbox" />
                            </th>
                            {headerTr.map((item, index) => (
                                <th
                                    key={index}
                                    className={`p-2 py-4 font-semibold ${item.toLowerCase() === "actions" ? "text-center" : "text-left"
                                        } capitalize`}
                                >
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataTr.length > 0 ? (
                            dataTr.map((data, index) => {
                                if (typeof TrName === 'function') {
                                    if (TrName.length > 1) {
                                        return <TrName key={index} displayData={data}  {...TrPropsName} />;
                                    } else {
                                        const TrComponent = TrName;
                                        return <TrComponent key={index} displayData={data}  {...TrPropsName} />;
                                    }
                                } else {
                                    return <TrName key={index} displayData={data}  {...TrPropsName} />;
                                }
                            })
                        ) : (
                            <tr>
                                <td colSpan={headerTr.length} className="text-center py-2 px-4">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableCan;