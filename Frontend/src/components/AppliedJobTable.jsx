import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs ? (
            <span>You havent applied to any jobs yet</span>
          ) : (
            allAppliedJobs.map((el, idx) => (
              <TableRow>
                <TableCell>{el.createdAt.split("T")[0]}</TableCell>
                <TableCell>{el.job.title}</TableCell>
                <TableCell>{el.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      el?.status === "rejected"
                        ? "bg-red-400"
                        : el.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {el.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
