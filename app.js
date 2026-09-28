var ST={d:"Đang vận hành",p:"Đang pilot",i:"Đang triển khai",c:"Đang coding"};
var S=[
{n:"Web Unime",s:"Nền tảng quản trị cho bộ phận vận hành và quản lý",m:[
["System admin","d",""],["Kết quả làm việc","d","Chấm công, báo cáo trưng bày, POSM, SOS"],["Quản lý master","d","Nhân viên, cửa hàng, nhà phân phối, sản phẩm"],["Promotion","d","Thông tin promotion, sản phẩm, target trưng bày"],["Đăng ký target KPI","d","Target KPI cho từng cửa hàng"],["Quản lý POSM","p","Tồn kho, lắp đặt tại cửa hàng"],["Đăng ký Beatplan","d","Beatplan cho từng Merchandiser"],["QC","d","Kiểm tra báo cáo trưng bày nhân viên gửi về"],["Auto mail","d","Tự gửi báo cáo cho ASM, NPP, AMM"],["QRCode cửa hàng","d","Xem thông tin, kết quả trưng bày, tiền thưởng, Visibility Xanh/Vàng/Đỏ. Bảo mật bằng tài khoản đăng nhập"]]},
{n:"Dashboard",s:"Góc nhìn điều hành cho các cấp quản lý",m:[
["POSM","c","POSM tại NPP và cửa hàng: nhập, tồn, lắp đặt, thu hồi"],["Summary Executive","d","Chỉ số chính để quản lý nắm nhanh thị trường"],["Employees Profile","d","Nhân sự theo khu vực, thâm niên, độ tuổi, giới tính, tỷ lệ nghỉ việc"],["Discipline","d","Số nhân viên đang làm việc và các số liệu tuân thủ"],["DisplayResult","d","Đạt, Rớt, KTB, KTC cùng % thực đạt OSA, Facing, Stock"],["QC","d","Remind, Pass, Reject, Cheating theo thời gian, khu vực, CTTB"],["KPI Performance","d","OSA, QC, Timespend, Successful Call của nhân viên"]]},
{n:"AcacyOne",s:"Phiên bản mobile cho quản lý xem thị trường mọi lúc",m:[
["Tổng quan","p","Performance nhân viên trên mobile"],["Đội ngũ","p","OSA, QC, Timespend, Successful Call trên mobile"],["Thị trường","p","Discipline, DisplayResult trên mobile"],["Cover","p","Mở rộng view mobile"],["Module tiếp theo","p","Đang lên kế hoạch mở rộng"]]},
{n:"System FWFC",s:"Hệ thống cho các cấp AMM, SUP khối FW và FC",m:[
["AMM FC SUP","i",""],["SUP FC Mer","i",""],["AMM FW","i",""],["SUP FW","i",""],["Report","i",""]]},
{n:"APP Unime",s:"Ứng dụng hằng ngày của Merchandiser tại cửa hàng",m:[
["APP giao diện mới","i","Mở rộng cho iOS và Android"],["Lịch làm việc","d","Danh sách cửa hàng, beatplan, cửa hàng gần tôi"],["Danh sách cửa hàng thực hiện","d","Lưu cửa hàng đã viếng thăm và chương trình khảo sát"],["Thông tin cửa hàng","d","Ảnh overview mỗi lần viếng thăm, chống gian lận vị trí, thời gian tối thiểu"],["Kết quả A.I trưng bày","i","AI phát hiện trưng bày không đạt"],["KPI","d","% hoàn thành KPI, lương tạm tính"],["Chi tiết cửa hàng","i","Visibility, QRCode, chấm công, Promotion, SOS, POSM, AI tự điền số vào báo cáo"],["Thời gian làm việc","d","Tổng giờ làm, cửa hàng đã viếng thăm, lịch sử CI/CO"],["Tạo mới cửa hàng","i","Nhân viên tự tạo cửa hàng viếng thăm"],["Đăng ký thêm Promotion","i","Nhân viên tự đăng ký promotion cho cửa hàng"],["Xuất danh sách hình ảnh","d","Ảnh overview, KPI, chương trình trưng bày"],["Xuất đơn hàng đề nghị","d","Từ sản phẩm hết hàng lên đơn đề nghị"],["Performance","d","Thống kê performance nhân viên"],["Đăng ký nghỉ phép","d","Duyệt theo cấp Mer, SUP, AMM"],["Profile","d","Thông tin user, quản lý, NPP, vùng, thành tựu"],["Nhận diện khuôn mặt","d","Chụp chính diện, trái, phải cập nhật hồ sơ"],["Đào tạo","d","Khóa học"],["Thông báo","d","Thông báo chương trình"],["Hỗ trợ","d","Gửi yêu cầu cho IT"]]}
];
function cnt(m){var r={d:0,p:0,i:0,c:0};m.forEach(function(x){r[x[1]]++});return r}
var tot=0,all={d:0,p:0,i:0,c:0};
S.forEach(function(s){var r=cnt(s.m);for(var k in r){all[k]+=r[k];tot+=r[k]}});
document.getElementById("stats").innerHTML=
 [[S.length,"hệ thống kết nối"],[tot,"module và tính năng"],[all.d,"đang vận hành"],[tot-all.d,"đang phát triển"]]
 .map(function(x){return "<div><b>"+x[0]+"</b><span>"+x[1]+"</span></div>"}).join("");
var cur=0,flt="all";
function bar(m){var r=cnt(m),n=m.length;return '<div class="bar">'+["d","p","i","c"].map(function(k){return '<i class="'+k+'" style="background:var(--c);width:'+(r[k]/n*100)+'%"></i>'}).join("")+"</div>"}
function tabs(){document.getElementById("tabs").innerHTML=S.map(function(s,i){var r=cnt(s.m);return '<button class="tab" role="tab" aria-selected="'+(i==cur)+'" data-i="'+i+'"><strong>'+s.n+'</strong><small>'+r.d+"/"+s.m.length+' đang vận hành</small>'+bar(s.m)+"</button>"}).join("")}
function panel(){var s=S[cur],r=cnt(s.m);
 var ch=[["all","Tất cả ("+s.m.length+")"]].concat(["d","p","i","c"].filter(function(k){return r[k]}).map(function(k){return [k,ST[k]+" ("+r[k]+")"]}));
 var l=s.m.filter(function(x){return flt=="all"||x[1]==flt});
 document.getElementById("panel").innerHTML="<h3 style='margin:0 0 4px;font-size:22px'>"+s.n+"</h3><p>"+s.s+'</p><div class="chips">'+ch.map(function(c){return '<button class="chip" data-f="'+c[0]+'" aria-pressed="'+(flt==c[0])+'">'+c[1]+"</button>"}).join("")+'</div><div class="mods">'+l.map(function(x){return '<div class="mod '+x[1]+'"><span class="tag"><span class="dot"></span>'+ST[x[1]]+"</span><h4>"+x[0]+"</h4>"+(x[2]?"<p>"+x[2]+"</p>":"")+"</div>"}).join("")+"</div>"}
document.getElementById("tabs").onclick=function(e){var b=e.target.closest(".tab");if(!b)return;cur=+b.dataset.i;flt="all";tabs();panel()};
document.getElementById("panel").onclick=function(e){var b=e.target.closest(".chip");if(!b)return;flt=b.dataset.f;panel()};
tabs();panel();
document.getElementById("road").innerHTML=[
["d","Đã hoàn thành ("+all.d+")",["Web quản trị, QC, auto mail, QRCode cửa hàng","6 dashboard điều hành","App Merchandiser: lịch làm việc, KPI, chấm công, nhận diện khuôn mặt, đào tạo"]],
["p","Đang pilot ("+all.p+")",["AcacyOne: bản mobile cho quản lý","Quản lý POSM trên web"]],
["i","Đang triển khai và coding ("+(all.i+all.c)+")",["App giao diện mới cho iOS và Android","AI nhận diện trưng bày, tự điền báo cáo","System FWFC và Dashboard POSM"]]
].map(function(x){return '<div class="'+x[0]+'" style="--c:var(--'+({d:"done",p:"pilot",i:"impl"})[x[0]]+')"><h3>'+x[1]+"</h3><ul>"+x[2].map(function(t){return "<li>"+t+"</li>"}).join("")+"</ul></div>"}).join("");