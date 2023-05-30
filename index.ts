import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

const sleep =()=>{
    return new Promise((res)=>{
        setTimeout(res, 2000)
    })
}
async function welcome(){
    let rainbowTitle= chalkAnimation.neon(" WELCOME TO THE PORTAL !!!");
    await sleep();
    rainbowTitle.stop();
   
}

await welcome()
class Student {
  private name: string;
  private id: string;
  private courses: string[];
  private balance: number;

  constructor(name: string) {
    this.name = name;
    this.id = this.generateStudentID();
    this.courses = [];
    this.balance = 0;
  }

  private generateStudentID(): string {
    const id = Math.floor(10000 + Math.random() * 90000).toString();
    return id;
  }

  public enroll(course: string): void {
    this.courses.push(course);
  }

  public viewBalance(): number {
    return this.balance;
  }

  public payTuition(amount: number): void {
    this.balance -= amount;
    console.log(`Payment of $${amount} received. Remaining balance: $${this.balance}`);
  }

  public showStatus(): void {
    console.log(`Student Name: ${this.name}`);
    console.log(`Student ID: ${this.id}`);
    console.log(`Courses Enrolled: ${this.courses.join(", ")}`);
    console.log(`Balance: $${this.balance}`);
  }
}

async function main(): Promise<void> {
  const studentNameAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'studentName',
      message: 'Enter the student name:'
    }
  ]);
  const studentName = studentNameAnswer.studentName;

  const student = new Student(studentName);

  while (true) {
    const { operation } = await inquirer.prompt([
      {
        type: 'list',
        name: 'operation',
        message: 'Choose an operation:',
        choices: ['Enroll', 'View Balance', 'Pay Tuition', 'Show Status', 'Exit']
      }
    ]);

    if (operation === 'Enroll') {
      const { course } = await inquirer.prompt([
        {
          type: 'input',
          name: 'course',
          message: 'Enter the course name:'
        }
      ]);
      student.enroll(course);
      console.log(`Successfully enrolled in ${course}`);
    } else if (operation === 'View Balance') {
      console.log(`Current Balance: $${student.viewBalance()}`);
    } else if (operation === 'Pay Tuition') {
      const { amount } = await inquirer.prompt([
        {
          type: 'number',
          name: 'amount',
          message: 'Enter the amount to pay:'
        }
      ]);
      student.payTuition(amount);
    } else if (operation === 'Show Status') {
      student.showStatus();
    } else if (operation === 'Exit') {
      break;
    }
  }
}

main();
