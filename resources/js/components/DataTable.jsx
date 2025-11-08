import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function getStatus(status) {
    switch (status) {
        case "Active":
        case "Approved":
            return "bg-[#4AD56D]";

        case "Pending":
        case "Inactive":
            return "bg-[#FF952B]";

            case "Rejected":
            return "bg-[#C62828]";
    }
}

export default function DataTable({ columns, data, actions }) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm max-w-full">
            <Table>
                <TableHeader className="bg-[#062745] [&_tr]:hover:bg-transparent [&_th]:hover:bg-transparent [&_th]:text-white">
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.key}>{col.label}</TableHead>
                        ))}
                        {actions && (
                            <TableHead className="text-center text-white">
                                Actions
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="text-center py-4 text-gray-500"
                            >
                                No data to show
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((col) => (
                                    <TableCell 
                                        key={col.key}
                                        className="max-w-[250px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
                                    >
                                        {col.key === "status" ? (
                                            <span
                                                className={`px-3 py-1 text-sm rounded-full font-medium text-white ${
                                                    getStatus(row.status)
                                                }`}
                                            >
                                                {row.status}
                                            </span>
                                        ) : (
                                            row[col.key]
                                        )}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell className="text-center">
                                        {actions(row)}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
