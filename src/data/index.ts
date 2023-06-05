import { Task } from '@/model/quadro';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: "Tax Accountant",
    description: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '2',
    title: "Computer Systems Analyst I",
    description: "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '3',
    title: "Accounting Assistant II",
    description: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '4',
    title: "Editor",
    description: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '5',
    title: "Help Desk Technician",
    description: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '6',
    title: "Safety Technician I",
    description: "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '7',
    title: "Clinical Specialist",
    description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '8',
    title: "Programmer III",
    description: "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '9',
    title: "Recruiter",
    description: "Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '10',
    title: "Dental Hygienist",
    description: "Donec ut mauris eget massa tempor convallis.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '11',
    title: "Human Resources Manager",
    description: "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '12',
    title: "GIS Technical Architect",
    description: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '13',
    title: "Associate Professor",
    description: "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '14',
    title: "Actuary",
    description: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '15',
    title: "Professor",
    description: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '16',
    title: "Senior Cost Accountant",
    description: "In hac habitasse platea dictumst.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '17',
    title: "VP Accounting",
    description: "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '18',
    title: "Environmental Tech",
    description: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '19',
    title: "Occupational Therapist",
    description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '20',
    title: "Account Coordinator",
    description: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '21',
    title: "Research Nurse",
    description: "Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '22',
    title: "Structural Engineer",
    description: "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '23',
    title: "Information Systems Manager",
    description: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '24',
    title: "Quality Engineer",
    description: "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '25',
    title: "Accounting Assistant I",
    description: "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '26',
    title: "Marketing Assistant",
    description: "Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '27',
    title: "Staff Accountant III",
    description: "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '28',
    title: "VP Marketing",
    description: "Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '29',
    title: "Editor",
    description: "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '30',
    title: "Dental Hygienist",
    description: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '31',
    title: "Environmental Tech",
    description: "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '32',
    title: "Accountant III",
    description: "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '33',
    title: "Office Assistant II",
    description: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '34',
    title: "Graphic Designer",
    description: "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '35',
    title: "Engineer IV",
    description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '36',
    title: "Clinical Specialist",
    description: "Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '37',
    title: "Health Coach I",
    description: "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '38',
    title: "Senior Sales Associate",
    description: "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '39',
    title: "Human Resources Assistant I",
    description: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
    status: 'DONE',
    progress: Math.random() * 100
  },
  {
    id: '40',
    title: "Operator",
    description: "Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
    status: 'In Progress',
    progress: Math.random() * 100
  },
  {
    id: '41',
    title: "Account Representative I",
    description: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    status: 'TODO',
    progress: Math.random() * 100
  },
  {
    id: '42',
    title: "Desktop Support Technician",
    description: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    status: 'DONE',
    progress: Math.random() * 100
  }
];
