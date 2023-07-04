"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNPAY_RESPONSE_CODE = exports.REFUND_REQUEST = void 0;
const VNPAY_RESPONSE_CODE = {
    '00': 'Giao dịch thành công',
    '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
    '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
    '10': 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
    '11': 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
    '12': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
    '13': 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
    '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
    '51': 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
    '65': 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
    '75': 'Ngân hàng thanh toán đang bảo trì.',
    '79': 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
    '99': 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)',
};
exports.VNPAY_RESPONSE_CODE = VNPAY_RESPONSE_CODE;
const REFUND_REQUEST = {
    '02': 'Tổng số tiền hoản trả lớn hơn số tiền gốc',
    '03': 'Dữ liệu gửi sang không đúng định dạng',
    '04': 'Không cho phép hoàn trả toàn phần sau khi hoàn trả một phần',
    '13': 'Chỉ cho phép hoàn trả một phần',
    '91': 'Không tìm thấy giao dịch yêu cầu hoàn trả',
    '93': 'Số tiền hoàn trả không hợp lệ. Số tiền hoàn trả phải nhỏ hơn hoặc bằng số tiền thanh toán.',
    '94': 'Yêu cầu bị trùng lặp trong thời gian giới hạn của API (Giới hạn trong 5 phút)',
    '95': 'Giao dịch này không thành công bên VNPAY. VNPAY từ chối xử lý yêu cầu.',
    '97': 'Chữ ký không hợp lệ',
    '98': 'Timeout Exception',
    '99': 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)',
};
exports.REFUND_REQUEST = REFUND_REQUEST;
//# sourceMappingURL=vnpay.interface.js.map