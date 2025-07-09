export const statusColor = (status) => {
  switch (status) {
    case "submitted":
      return "text-yellow-500";
    case "accepted":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    case "revised":
      return "text-blue-600";
    default:
      return "text-gray-500";
  }
};

export const formatStatus = (status) => {
  switch (status) {
    case "submitted":
      return "Menunggu";
    case "accepted":
      return "Diterima";
    case "rejected":
      return "Ditolak";
    case "revised":
      return "Revisi";
    default:
      return status;
  }
};
