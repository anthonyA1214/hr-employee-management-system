import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function DataTable({ columns, data, actions }) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
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
                                    <TableCell key={col.key}>
                                        {col.key === "status" ? (
                                            <span
                                                className={`px-3 py-1 text-sm rounded-full font-medium text-white ${
                                                    row.status === "Active"
                                                        ? "bg-[#41D56D]"
                                                        : "bg-[#FF0000]"
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
