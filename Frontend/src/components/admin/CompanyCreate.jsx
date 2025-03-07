import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

function CompanyCreate() {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { name: companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const companyId = res.data.company._id;
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast(res.data.message);
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log("Error in registering new company", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>
        <Label className="text-md">Company Name</Label>
        <Input
          value={companyName}
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2"
          placeholder="Google, Microsoft, ..."
        />
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="bg-[#3674B5] hover:bg-[#314b66]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
