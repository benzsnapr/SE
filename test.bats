#!usr/bin/env bats

@test "กำหนดคืนเดิม ไม่รับ null" {
	json=$(curl -X POST -s -H "Content-Type:application/json" -d '{"originalDate": null,"newReturnDate": "2020-02-21","copy": "copy/1","member": "member/2"}' http://localhost:8080/api/extendedBooks)
	echo $json | grep "may not be null"
}

@test "กำหนดคืนใหม่ ไม่รับ null" {
	json=$(curl -X POST -s -H "Content-Type:application/json" -d '{"originalDate": "2020-02-21","newReturnDate": null,"copy": "copy/1","member": "member/2"}' http://localhost:8080/api/extendedBooks)
	echo $json | grep "may not be null"
}

@test "กำหนดคืนใหม่ ต้องไม่รับวันที่ ในอดีต" {
	json=$(curl -X POST -s -H "Content-Type:application/json" -d '{"originalDate": "2020-02-21","newReturnDate": "2017-02-01","copy": "copy/1","member": "member/2"}' http://localhost:8080/api/extendedBooks)
	echo $json | grep "must be in the future"
}

@test "ฟิล copy ไม่รับ String 'aa'" {
	json=$(curl -X POST -s -H "Content-Type:application/json" -d '{"originalDate": "2020-02-21","newReturnDate": "2020-02-01","copy": "aa","member": "member/2"}' http://localhost:8080/api/extendedBooks)
	echo $json | grep "Failed to convert from type"
}

@test "รับค่าการขยายเวลาได้ถูกต้อง" {
	json=$(curl -X POST -s -H "Content-Type:application/json" -d '{"originalDate": "2020-01-21","newReturnDate": "2020-01-28","copy": "copy/1","member": "member/2"}' http://localhost:8080/api/extendedBooks |jq -r ._embedded.member.lastName)
	[ "$json" == "Pongsupan" ]
}
