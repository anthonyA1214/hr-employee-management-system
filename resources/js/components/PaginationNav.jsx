import { Link } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationEllipsis,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";
import { getVisiblePages } from "@/utils/pagination";

export default function PaginationNav({ data }) {
    if (!data) return null;

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    {data.prev_page_url ? (
                        <Link href={data.prev_page_url}>
                            <PaginationPrevious className="hover:bg-[#30A1EF] hover:text-[#F2F2F2]" />
                        </Link>
                    ) : (
                        <PaginationPrevious disabled className="opacity-50 hover:bg-transparent" />
                    )}
                </PaginationItem>

                {/* First page + ellipsis */}
                {data.current_page > 3 && (
                    <>
                        <PaginationItem>
                            <Link href="?page=1">
                                <PaginationLink>1</PaginationLink>
                            </Link>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {/* Visible pages */}
                {getVisiblePages(data.current_page, data.last_page).map((page) => (
                    <PaginationItem key={page}>
                        {page === data.current_page ? (
                            <PaginationLink className="bg-[#018CEF] text-[#F2F2F2] hover:bg-[#018CEF] hover:text-[#F2F2F2] active:bg-[#018CEF] active:text-[#F2F2F2]">
                                {page}
                            </PaginationLink>
                        ) : (
                            <Link href={`?page=${page}`}>
                                <PaginationLink className="hover:bg-[#30A1EF] hover:text-[#F2F2F2]">
                                    {page}
                                </PaginationLink>
                            </Link>
                        )}
                    </PaginationItem>
                ))}

                {/* Last page + ellipsis */}
                {data.current_page < data.last_page - 2 && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <Link href={`?page=${data.last_page}`}>
                                <PaginationLink>{data.last_page}</PaginationLink>
                            </Link>
                        </PaginationItem>
                    </>
                )}

                {/* Next */}
                <PaginationItem>
                    {data.next_page_url ? (
                        <Link href={data.next_page_url}>
                            <PaginationNext className="hover:bg-[#30A1EF] hover:text-[#F2F2F2]" />
                        </Link>
                    ) : (
                        <PaginationNext disabled className="opacity-50 hover:bg-transparent" />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
