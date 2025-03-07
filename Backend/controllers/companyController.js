import { Company } from "../models/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataURI.js";

export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return res.status(400).json({
        message: "Please provide all fields",
        success: false,
      });
    }
    let company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({
        message: "Company already registered",
        success: false,
      });
    }
    company = await Company.create({
      name,
      userId: req.id,
    });
    return res.status(200).json({
      message: "Company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Error in registerCompanyAPI", error);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log("Error in getCompanyAPI", error);
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log("Error in getCompanyByIdAPI", error);
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    let fileUri, cloudResponse, logo;
    if (file) {
      fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }
    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Error in updateCompanyAPI", error);
  }
};
