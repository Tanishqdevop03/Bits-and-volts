import { Parser } from "json2csv";

export const convertToCSV = (data) => {
  const fields = ["firstName", "lastName", "email", "phone", "age","gender", "location", "profileImage"];
  const parser = new Parser({ fields });
  return parser.parse(data);
};