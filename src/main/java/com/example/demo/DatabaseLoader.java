package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

@Component
public class DatabaseLoader implements CommandLineRunner {

	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private CopyRepository copyRepository;
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private LibrarianRepository librarianRepository;
	@Autowired
	private BorrowBookRepository borrowBookRepository;
	@Autowired
	private BorrowbookhistoryRepository borrowbookhistoryRepository;
	@Autowired
    private BookstoreRepository bookstoreRepository;
	@Autowired
	private CopyStatusRepository copystatusRepository;
	@Autowired
	private UsertypeRepository usertypeRepository;
	@Autowired
	private RoomRepository roomRepository;
	@Autowired
	private RoomStatusRepository  roomStatusRepository;
	@Autowired
	private RoomScheduleRepository roomScheduleRepository;
	@Autowired
	private RoomReservationRepository roomReservationRepository;
	@Autowired
	private RegbookRepository regbookRepository;
	@Autowired
	private ComputerRepository computerRepository;
	@Autowired
	private ComStatusRepository comStatusRepository;
	@Autowired
	private ComReservationRepository comReservationRepository;
	@Autowired
	private EbookRepository ebookRepository;
	@Autowired
	private Interlibery_loanRepository interliberyLoanRepository;
	@Autowired
	private OtherliberyRepository otherliberyRepository;
	@Autowired
	private OtherBookRepository otherBookRepository;

	@Override
	public void run(String... strings) throws Exception {
		//Copy Status
		CopyStatus cs1 = new CopyStatus("OnShelf");
		CopyStatus cs2 = new CopyStatus("Borrowed");
		CopyStatus cs3 = new CopyStatus("Hold");
		CopyStatus cs4 = new CopyStatus("Borrowed+Extend");
		CopyStatus cs5 = new CopyStatus("Deadline");
		this.copystatusRepository.save(cs1);
		this.copystatusRepository.save(cs2);
		this.copystatusRepository.save(cs3);
		this.copystatusRepository.save(cs4);
		this.copystatusRepository.save(cs5);

		//User Type
		Usertype t1 = new Usertype("librarian");
		Usertype t2 = new Usertype("member");
		this.usertypeRepository.save(t1);
		this.usertypeRepository.save(t2);

		//Default User
		User ux = new User("mem","1",t2);
		User uy = new User("lib","1",t1);
		this.userRepository.save(ux);
		this.userRepository.save(uy);
		Member m = new Member("Donald","Trump","081-1111111", "Thailand",ux);
		this.memberRepository.save(m);
		Librarian mm = new Librarian("Hillary","Clinton","082-22222222", "Thailand",uy);
		this.librarianRepository.save(mm);
		User u1 = new User("B5800018","1",t2);
		User u2 = new User("B5801756","1",t2);
		User u3 = new User("B5814732","1",t2);
		User u4 = new User("B5800032","1",t1);
		User u5 = new User("B5813568","1",t1);
		User u6 = new User("B5814749","1",t1);
		this.userRepository.save(u1);
		this.userRepository.save(u2);
		this.userRepository.save(u3);
		this.userRepository.save(u4);
		this.userRepository.save(u5);
		this.userRepository.save(u6);
		Member m1 = new Member("Watsamon","Pongsupan","083-33333333", "Chaiyaphum, Thailand",u1);
		this.memberRepository.save(m1);
		Member m2 = new Member("Naruepanart","Siangsanan","084-44444444", "-, Thailand",u2);
		this.memberRepository.save(m2);
		Member m3 = new Member("Warinpipop","Techipannawat","085-55555555", "-, Thailand",u3);
		this.memberRepository.save(m3);
		Librarian l1 = new Librarian("Kanin","Sakwattanavakin","086-66666666", "Surin, Thailand",u4);
		this.librarianRepository.save(l1);
		Librarian l2 = new Librarian("Akkarapong","Khamtanet","087-77777777", "-, Thailand",u5);
		this.librarianRepository.save(l2);
		Librarian l3 = new Librarian("Phingnarin","Nurnuansuwan","088-88888888", "-, Thailand",u6);
		this.librarianRepository.save(l3);

		//Book + Copy + regbook
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
		Book b1 = new Book(
				"Harry Potter and the Philosopher's Strone",
				"9789744723628",
				"J.K. Rowling",
				"December 1997",
				"Eleven-year-old Harry Potter has been living an ordinary life, constantly abused by his surly and cold uncle and aunt, Vernon and Petunia Dursley and bullied by their spoiled son Dudley.",
				"English",
				"/images/1.jpg"
		);
		this.bookRepository.save(b1);
		Copy c1 = new Copy(b1,cs2,"DUE:08 Feb 2018");
		Copy c2 = new Copy(b1,cs2,"DUE:15 Feb 2018");
		Copy c3 = new Copy(b1,cs1,"on Shelf");
		this.copyRepository.save(c1);
		this.copyRepository.save(c2);
		this.copyRepository.save(c3);
		this.regbookRepository.save(new Regbook(b1,df.parse("01/01/2018"),l1,3));

		Book b2 = new Book(
				"And Then There Were None",
				"9780062073488",
				"Agatha Christie",
				"March 2011",
				"ฆาตกรรมยกเกาะ เป็นเรื่องราวของคน 10 คนที่มารวมตัวกันบนเกาะตามคำเชิญของคนลึกลับนาม อ.น. โอเว่น และหลังจากนั้นคนทั้งหมดก็ทยอยตายไปทีละคนจนหมด",
				//"waiting",
				"Thai",
				"/images/2.jpg"
		);
		this.bookRepository.save(b2);
		this.copyRepository.save(new Copy(b2,cs1,"on Shelf"));
		this.regbookRepository.save(new Regbook(b2,df.parse("01/01/2018"),l1,2));

		Book b3 = new Book(
				"The Lightning Thief",
				"9780786838653",
				"Rick Riordan",
				"March 2006",
				"The Lightning Thief is narrated in the first person by Percy Jackson, a 12-year-old boy with dyslexia and ADHD who lives in New York City with his mother Sally and abusive stepfather.",
				"English",
				"/images/3.jpg"
		);
		this.bookRepository.save(b3);
		Copy c5 = new Copy(b3,cs2,"DUE:16 Feb 2018");
		this.copyRepository.save(c5);
		this.copyRepository.save(new Copy(b3,cs1,"on Shelf"));
		this.regbookRepository.save(new Regbook(b3,df.parse("01/03/2018"),l1,2));

		Book b4 = new Book(
				"The Sea of Monsters",
				"9781423103349",
				"Rick Riordan",
				"April 2007",
				"Percy Jackson has been having nightmares about Grover Underwood running from an unseen monster and taking refuge in a wedding dress shop.",
				"English",
				"/images/4.jpg"
		);
		this.bookRepository.save(b4);
		Copy c7 = new Copy(b4,cs2,"DUE:17 Feb 2018");
		Copy c8 = new Copy(b4,cs2,"DUE:18 Feb 2018");
		this.copyRepository.save(c7);
		this.copyRepository.save(c8);
		this.regbookRepository.save(new Regbook(b4,df.parse("01/05/2018"),l1,2));

		Book b5 = new Book(
				"The Titan's Curse",
				"9781423101482",
				"Rick Riordan",
				"April 2008",
				"Percy Jackson, Annabeth Chase, and Thalia Grace get a ride from Mrs. Jackson to Westover Hall, a boarding school in Bar Harbor, Maine, to escort two sibling half-bloods.",
				"English",
				"/images/5.jpg"
		);
		this.bookRepository.save(b5);
		this.copyRepository.save(new Copy(b5,cs1,"on Shelf"));
		this.copyRepository.save(new Copy(b5,cs1,"on Shelf"));
		this.regbookRepository.save(new Regbook(b5,df.parse("01/07/2018"),l1,2));

		Book b6 = new Book(
				"A Game of Thrones : A Song of Ice and Fire",
				"9789742894177",
				"George R. R. Martin",
				"March 2011",
				"ปฐมบทแห่ง มหาศึกชิงบัลลังก์ A Song of Ice and Fire",
				"Thai",
				"/images/6.jpg"
		);
		this.bookRepository.save(b6);
		this.copyRepository.save(new Copy(b6,cs1,"on Shelf"));
		this.regbookRepository.save(new Regbook(b6,df.parse("01/08/2018"),l1,1));

		Book b7 = new Book(
				"A Game of Thrones : A Clash of Kings",
				"9780553579901",
				"George R. R. Martin",
				"September 2000",
				"การต่อสู้เพื่อช่วงชิงบัลลังก์เหล็กดำเนินต่อไปอย่างเข้มข้นและนองเลือดยิ่งขึ้น ทุกคนต่างประกาศตนหรือได้รับการยกขึ้นเป็นพระราชา จึงต้องยกทัพไปสู้รบกัน",
				"Thai",
				"/images/7.jpg"
		);
		this.bookRepository.save(b7);
		this.copyRepository.save(new Copy(b7,cs1,"on Shelf"));
		this.regbookRepository.save(new Regbook(b7,df.parse("01/09/2018"),l1,1));

		Book b8 = new Book(
				"A Game of Thrones : A Storm of Sword",
				"9786163874696",
				"George R. R. Martin",
				"March 2003",
				"เล่มที่สามของชุด มหาศึกชิงบัลลังก์นี้ ได้รับการยกย่องว่าเป็นเล่มที่สนุกที่สุดของชุดเท่าที่ผ่านมา เนื้อเรื่องเข้มข้นมีความเคลื่อนไหวเปลี่ยนแปลงอย่างคาดไม่ถึงมากมายหลายตอน โดยเฉพาะตอนท้ายเล่ม ที่ทำเอาผู้อ่านตกตะลึงแทบทุกบท",
				"Thai",
				"/images/8.jpg"
		);
		this.bookRepository.save(b8);
		this.copyRepository.save(new Copy(b8,cs1,"on Shelf"));
		this.regbookRepository.save(new Regbook(b8,df.parse("01/10/2018"),l1,1));

		Book b9 = new Book(
				"A Game of Thrones : A Feast for Crows",
				"9786163874696",
				"George R. R. Martin",
				"September 2006",
				"หลังจากการต่อสู้ชิงดีชิงเด่นอย่างขมขื่นนานหลายศตวรรษ มหาอำนาจทั้งเจ็ดที่แบ่งแยกดินแดนต่างเอาชนะกันและกันจนบังเกิดการสงบศึกที่ลึกลงไปความเคืองแค้นยังคงคุกรุ่นดุจคลื่นใต้น้ำ ",
				"Thai",
				"/images/9.jpg"
		);
		this.bookRepository.save(b9);
		this.copyRepository.save(new Copy(b9,cs1,"on Shelf"));
		this.regbookRepository.save(new Regbook(b9,df.parse("01/11/2018"),l1,1));

		Book b10 = new Book(
				"A Game of Thrones : A Dance with Dragons",
				"9786163876454",
				"George R. R. Martin",
				"October 2013",
				"ความขัดแย้งอันแสนขมขื่นจากทุกมุมโลกถูกจุดขนวนขึ้นอีกครั้ง การทรยศหักหลังจากคนใกล้ตัวเกิดขึ้นตลอดเวลา ทุกคนต่างต้องเผชิญอุปสรรคที่ดูเหมือนจะไม่อาจก้าวข้ามได้ บ้างก็จะล้มเหลว บ้างก็จะแข็งแกร่งขึ้นในพลังแห่งความมืด",
				"Thai",
				"/images/10.jpg"
		);
		this.bookRepository.save(b10);
		this.copyRepository.save(new Copy(b10,cs1,"on Shelf"));
		this.regbookRepository.save(new Regbook(b10,df.parse("01/12/2018"),l1,1));

		Book b11 = new Book(
				"Harry Potter And The Chamber Of Secrets",
				"9780439064873",
				"J.K. Rowling",
				"September 2000",
				"ตัวหนังสือสูงหนึ่งฟุตเขียนพาดไว้บนกำแพงระหว่างหน้าต่างสองบาน ส่องประกายวาวอยู่ใต้แสงจากคบไฟที่ผนัง ห้องแห่งความลับเปิดออกแล้ว เหล่าศัตรูของทายาท จงระวัง",
				"Thai",
				"/images/11.jpg"
		);
		this.bookRepository.save(b11);
		Copy c16 = new Copy(b11,cs2,"DUE:19 Feb 2018");
		this.copyRepository.save(c16);
		this.regbookRepository.save(new Regbook(b11,df.parse("01/15/2018"),l1,1));

		//Borrow book
		Borrowbook bb0 = new Borrowbook(c1,m2,df.parse("02/01/2018"),df.parse("02/08/2018"),l3);
		this.borrowBookRepository.save(bb0);
		Borrowbook bb1 = new Borrowbook(c2,m1,df.parse("02/16/2018"),df.parse("02/23/2018"),l3);
		this.borrowBookRepository.save(bb1);
		Borrowbook bb2 = new Borrowbook(c5,m3,df.parse("02/17/2018"),df.parse("02/24/2018"),l3);
		this.borrowBookRepository.save(bb2);
		Borrowbook bb3 = new Borrowbook(c7,m2,df.parse("02/18/2018"),df.parse("02/25/2018"),l3);
		this.borrowBookRepository.save(bb3);
		Borrowbook bb4 = new Borrowbook(c8,m3,df.parse("02/19/2018"),df.parse("02/26/2018"),l3);
		this.borrowBookRepository.save(bb4);
		Borrowbook bb5 = new Borrowbook(c16,m1,df.parse("02/01/2018"),df.parse("02/08/2018"),l3);
		this.borrowBookRepository.save(bb5);

		//Borrow bookhistory
		Borrowbookhistory bbh0 = new Borrowbookhistory(c1,m2,df.parse("02/01/2018"),df.parse("02/08/2018"),l3);
		this.borrowbookhistoryRepository.save(bbh0);
		Borrowbookhistory bbh1 = new Borrowbookhistory(c2,m1,df.parse("02/16/2018"),df.parse("02/23/2018"),l3);
		this.borrowbookhistoryRepository.save(bbh1);
		Borrowbookhistory bbh2 = new Borrowbookhistory(c5,m3,df.parse("02/17/2018"),df.parse("02/24/2018"),l3);
		this.borrowbookhistoryRepository.save(bbh2);
		Borrowbookhistory bbh3 = new Borrowbookhistory(c7,m2,df.parse("02/18/2018"),df.parse("02/25/2018"),l3);
		this.borrowbookhistoryRepository.save(bbh3);
		Borrowbookhistory bbh4 = new Borrowbookhistory(c8,m3,df.parse("02/19/2018"),df.parse("02/26/2018"),l3);
		this.borrowbookhistoryRepository.save(bbh4);
		Borrowbookhistory bbh5 = new Borrowbookhistory(c16,m1,df.parse("02/03/2018"),df.parse("02/10/2018"),l3);
		this.borrowbookhistoryRepository.save(bbh5);

		//Book Store
		Bookstore bs1 = new Bookstore("StartWork Magazine",100);
        Bookstore bs2 = new Bookstore("CheckTour Magazine",200);
        Bookstore bs3 = new Bookstore("SuperBike Magazine",300);
        Bookstore bs4 = new Bookstore("WingsBird Magazine",400);
        Bookstore bs5 = new Bookstore("Experience Magazine",500);
        this.bookstoreRepository.save(bs1);
        this.bookstoreRepository.save(bs2);
        this.bookstoreRepository.save(bs3);
        this.bookstoreRepository.save(bs4);
        this.bookstoreRepository.save(bs5);

		// Room
		RoomStatus rs1 = new RoomStatus("Ready");
		RoomStatus rs2 = new RoomStatus("Hold");
		RoomStatus rs3 = new RoomStatus("Time_out");
		this.roomStatusRepository.save(rs1);
		this.roomStatusRepository.save(rs2);
		this.roomStatusRepository.save(rs3);

		DateFormat dft = new SimpleDateFormat("HH:mm");
		String[] timeSlot = {"08:30","09:30","10:30","11:30","12:30","13:30","14:30","15:30","16:30","23:50","23:55","23:59"};

		Room room1 = new Room("S01");this.roomRepository.save(room1);
		Room room2 = new Room("S02");this.roomRepository.save(room2);
		Room room3 = new Room("S03");this.roomRepository.save(room3);
		Room room4 = new Room("S04");this.roomRepository.save(room4);
		Room room5 = new Room("S05");this.roomRepository.save(room5);
		Room room6 = new Room("G01");this.roomRepository.save(room6);
		Room room7 = new Room("G02");this.roomRepository.save(room7);
		Room room8 = new Room("G03");this.roomRepository.save(room8);

		Date today = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(today);
		calendar.add(Calendar.YEAR, 0);
		today = calendar.getTime();
		System.out.println("today is " + today);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DAY_OF_MONTH);


		Room[] room = new Room[] { room1, room2, room3, room4, room5, room6, room7, room8 };
		RoomSchedule[] rt = new RoomSchedule[timeSlot.length*room.length];
		Integer i,j;
		for(i = 0 ; i<timeSlot.length ; i++) {
			Date temp = dft.parse(timeSlot[i]);
			Calendar calendarTemp = Calendar.getInstance();
			calendarTemp.setTime(temp);
			calendarTemp.set(Calendar.DATE, day);
			calendarTemp.set(Calendar.MONTH, month);
			calendarTemp.set(Calendar.YEAR, year);
			temp = calendarTemp.getTime();
			for(j=0 ; j<room.length ;j++){
				if (today.compareTo(temp) > 0) {
					// OverTime
					rt[i] = new RoomSchedule(i,room[j],rs3); this.roomScheduleRepository.save(rt[i]);
				} else{
					// Ready to Hold
					rt[i] = new RoomSchedule(i,room[j],rs1); this.roomScheduleRepository.save(rt[i]);
				}
			}
			

		}
		
		
		Date todayDate = new Date();
		Borrowbook[] bA = new Borrowbook[] { bb0, bb1, bb2 , bb3, bb4, bb5 };
		Integer x;
		for(x=0 ; x<bA.length ;x++){
			if(todayDate.compareTo(bA[x].getEndDate()) > 0){
				Copy temp = bA[x].getCopy();
				temp.setStatus(cs5);
				temp.setNote("#Over Deadline");
				this.copyRepository.save(temp);
			}

		}

		//computer
		ComStatus coms1 = new ComStatus("Empty");
		this.comStatusRepository.save(coms1);
		ComStatus coms2 = new ComStatus("Reserved");
		this.comStatusRepository.save(coms2);
		Computer com1 = new Computer("COM001","DELL .......",coms2);
		this.computerRepository.save(com1);
		Computer com2 = new Computer("COM002","DELL .......",coms1);
		this.computerRepository.save(com2);
		Computer com3 = new Computer("COM003","LENOVO .......",coms1);
		this.computerRepository.save(com3);
		Computer com4 = new Computer("COM004","LENOVO .......",coms1);
		this.computerRepository.save(com4);
		Computer com5 = new Computer("COM005","LENOVO .......",coms1);
		this.computerRepository.save(com5);
		Computer com6 = new Computer("COM006","HP .......",coms1);
		this.computerRepository.save(com6);
		Computer com7 = new Computer("COM007","HP .......",coms1);
		this.computerRepository.save(com7);
		Computer com8 = new Computer("COM008","DELL .......",coms1);
		this.computerRepository.save(com8);

		Date dt = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(dt);
		c.add(Calendar.DATE, 1);
		dt = c.getTime();
		ComReservation comReservation = new ComReservation(com1, m3,dt);
		this.comReservationRepository.save(comReservation);

		Ebook ebook1 = new Ebook("https://drive.google.com/file/d/1vJ_U-s2y3vY0U5QT780kaXRNsSituLqD","https://drive.google.com/file/d/1CTU7X8OlBkUn3EV04FBHHnFpNQPB9cAP",b1,l2);
		Ebook ebook2 = new Ebook("https://drive.google.com/file/d/1vJ_U-s2y3vY0U5QT780kaXRNsSituLqD","https://drive.google.com/file/d/1CTU7X8OlBkUn3EV04FBHHnFpNQPB9cAP",b2,l3);
		Ebook ebook3 = new Ebook("https://drive.google.com/file/d/1vJ_U-s2y3vY0U5QT780kaXRNsSituLqD","https://drive.google.com/file/d/1CTU7X8OlBkUn3EV04FBHHnFpNQPB9cAP",b3,l1);
		Ebook ebook4 = new Ebook("https://drive.google.com/file/d/1vJ_U-s2y3vY0U5QT780kaXRNsSituLqD","https://drive.google.com/file/d/1CTU7X8OlBkUn3EV04FBHHnFpNQPB9cAP",b4,l3);
		Ebook ebook5 = new Ebook("https://drive.google.com/file/d/1vJ_U-s2y3vY0U5QT780kaXRNsSituLqD","https://drive.google.com/file/d/1CTU7X8OlBkUn3EV04FBHHnFpNQPB9cAP",b5,l3);
		this.ebookRepository.save(ebook1);
		this.ebookRepository.save(ebook2);
		this.ebookRepository.save(ebook3);
		this.ebookRepository.save(ebook4);
		this.ebookRepository.save(ebook5);

			Otherlibery CU = new Otherlibery("CU","M.1/Bankok");
		Otherlibery MSU = new Otherlibery("MSU","M.2/Bankok");
		Otherlibery KU = new Otherlibery("KU","M.3/Bankok");
		Otherlibery CMU = new Otherlibery("CMU","M.4/Bankok");
		Otherlibery KKU = new Otherlibery("KKU","M.5/Bankok");
		this.otherliberyRepository.save(CU);
		this.otherliberyRepository.save(MSU);
		this.otherliberyRepository.save(KU);
		this.otherliberyRepository.save(CMU);
		this.otherliberyRepository.save(KKU);

		OtherBook ILL1 = new OtherBook(
				"Harry Potter and the Philosopher's Strone",
				"Thai",
				"J.K. Rowling",
				"/images/1.jpg",
				CU
		);
		this.otherBookRepository.save(ILL1);

		OtherBook ILL2 = new OtherBook(
				"The Medium of the Video Game",
				"Thai",
				"มาร์ก เจ. พี. วูล์ฟ",
				"/images/i2.jpg",
				KU
		);
		this.otherBookRepository.save(ILL2);
		OtherBook ILL3 = new OtherBook(
				"the video game theory reader 2",
				"Thai",
				"มาร์ก เจ. พี. วูล์ฟ",
				"/images/i3.jpg",
				CU
		);
		this.otherBookRepository.save(ILL3);
		OtherBook ILL4 = new OtherBook(
				"Horror Video Games: Essays on the Fusion of Fear and Play",
				"Thai",
				" เบอร์นาร์ด เพอร์รอน",
				"/images/i4.jpg",
				MSU
		);
		this.otherBookRepository.save(ILL4);
		OtherBook ILL5 = new OtherBook(
				"Myst and Riven: The World of the D'ni",
				"Thai",
				"มาร์ก เจ. พี. วูล์ฟ",
				"/images/i5.jpg",
				KKU
		);
		this.otherBookRepository.save(ILL5);
		OtherBook ILL6 = new OtherBook(
				"Test",
				"Thai",
				"มาร์ก เจ. พี. วูล์ฟ",
				"/images/i5.jpg",
				KKU
		);
		this.otherBookRepository.save(ILL6);
			OtherBook ILL7 = new OtherBook(
				"Hollywood genres",
				"Thai",
				"โทมัส แชทซ์",
				"/images/i6.jpg",
				KKU
		);
		this.otherBookRepository.save(ILL7);
			OtherBook ILL8 = new OtherBook(
				"Hollywood genres",
				"Thai",
				"โทมัส แชทซ์",
				"/images/i6.jpg",
				MSU
		);
		this.otherBookRepository.save(ILL8);

	}
}
