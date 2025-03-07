import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/update/${id}`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error in handling status", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((it) => (
              <tr>
                <TableCell>{it.applicant.fullName}</TableCell>
                <TableCell>{it.applicant.email}</TableCell>
                <TableCell>{it.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {it.applicant.profile.resume ? (
                    <a
                      className="text-[#3674B5]"
                      href={it.applicant.profile.resume}
                    >
                      {it.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{it.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {["Accepted", "Rejected"].map((status, idx) => (
                        <div
                          onClick={() => statusHandler(status, it?._id)}
                          key={idx}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
