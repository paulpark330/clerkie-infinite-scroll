import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import Friend from "@/components/Friend/Friend";

import Filter from "@/components/Filter/Filter";

const Friends = () => {


  const data = [
    {
      id: 1,
      firstName: "Benjamin",
      lastName: "King",
      email: "benjamin.king@example.com",
      phoneNumber: "(574) 209-2530",
      friendStatus: 2,
    },
    {
      id: 2,
      firstName: "Heather",
      lastName: "Krause",
      email: "heather.krause@example.com",
      phoneNumber: "(650) 946-1036",
      friendStatus: 0,
    },
    {
      id: 3,
      firstName: "Manuel",
      lastName: "King",
      email: "manuel.king@example.com",
      phoneNumber: "(375) 931-2573",
      friendStatus: 1,
    },
    {
      id: 4,
      firstName: "Fred",
      lastName: "Wallace",
      email: "fred.wallace@example.com",
      phoneNumber: "(799) 993-9450",
      friendStatus: 0,
    },
    {
      id: 5,
      firstName: "Elizabeth",
      lastName: "Smith",
      email: "elizabeth.smith@example.com",
      phoneNumber: "(268) 850-9828",
      friendStatus: 0,
    },
    {
      id: 6,
      firstName: "Lisa",
      lastName: "Rios",
      email: "lisa.rios@example.com",
      phoneNumber: "(472) 436-5854",
      friendStatus: 0,
    },
    {
      id: 7,
      firstName: "Danielle",
      lastName: "Lucas",
      email: "danielle.lucas@example.com",
      phoneNumber: "(796) 693-8277",
      friendStatus: 2,
    },
    {
      id: 8,
      firstName: "Joseph",
      lastName: "Patterson",
      email: "joseph.patterson@example.com",
      phoneNumber: "(723) 254-6289",
      friendStatus: 0,
    },
    {
      id: 9,
      firstName: "Maria",
      lastName: "Estes",
      email: "maria.estes@example.com",
      phoneNumber: "(218) 226-7687",
      friendStatus: 2,
    },
    {
      id: 10,
      firstName: "Regina",
      lastName: "Lopez",
      email: "regina.lopez@example.com",
      phoneNumber: "(494) 314-4102",
      friendStatus: 1,
    },
    {
      id: 11,
      firstName: "William",
      lastName: "Vasquez",
      email: "william.vasquez@example.com",
      phoneNumber: "(238) 870-2227",
      friendStatus: 0,
    },
    {
      id: 12,
      firstName: "Carlos",
      lastName: "Brown",
      email: "carlos.brown@example.com",
      phoneNumber: "(754) 969-2191",
      friendStatus: 1,
    },
    {
      id: 13,
      firstName: "Lawrence",
      lastName: "Robinson",
      email: "lawrence.robinson@example.com",
      phoneNumber: "(729) 224-1860",
      friendStatus: 2,
    },
  ];

  const toggleFilter = () => {
    console.log("toggle filter");
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <Header title="Friends" />
      <main className={styles.main}>
       <Filter />
        <ul className={styles.friends}>
          {data.map((friend) => (
            <Friend friend={friend} key={friend.id} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Friends;
