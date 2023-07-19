import { ColunaKanban, TarefaDocument } from '@/model/quadro';

export const INITIAL_TASKS: TarefaDocument[] = [
  {
    id: '1',
    titulo: "Tax Accountant",
    descricao: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
    status: ColunaKanban.IN_PROGRESS
  },
  {
    id: '2',
    titulo: "Computer Systems Analyst I",
    descricao: "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
    status: ColunaKanban.TODO
  },
  {
    id: '3',
    titulo: "Accounting Assistant II",
    descricao: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    status: ColunaKanban.DONE
  },
  {
    id: '4',
    titulo: "Editor",
    descricao: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
    status: ColunaKanban.IN_PROGRESS
  },
  {
    id: '5',
    titulo: "Help Desk Technician",
    descricao: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
    status: ColunaKanban.TODO
  },
  {
    id: '6',
    titulo: "Safety Technician I",
    descricao: "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
    status: ColunaKanban.DONE
  },
  {
    id: '7',
    titulo: "Clinical Specialist",
    descricao: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.",
    status: ColunaKanban.IN_PROGRESS
  },
  {
    id: '8',
    titulo: "Programmer III",
    descricao: "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    status: ColunaKanban.TODO
  },
  {
    id: '9',
    titulo: "Recruiter",
    descricao: "Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.",
    status: ColunaKanban.DONE
  },
  {
    id: '10',
    titulo: "Dental Hygienist",
    descricao: "Donec ut mauris eget massa tempor convallis.",
    status: ColunaKanban.IN_PROGRESS
  },
  {
    id: '11',
    titulo: "Human Resources Manager",
    descricao: "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    status: ColunaKanban.TODO
  },
  {
    id: '12',
    titulo: "GIS Technical Architect",
    descricao: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
    status: ColunaKanban.DONE
  },
  {
    id: '13',
    titulo: "Associate Professor",
    descricao: "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
    status: ColunaKanban.IN_PROGRESS
  },
  {
    id: '14',
    titulo: "Actuary",
    descricao: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    status: ColunaKanban.TODO
  },
  {
    id: '15',
    titulo: "Professor",
    descricao: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
    status: ColunaKanban.DONE
  },
  {
    id: '16',
    titulo: "Senior Cost Accountant",
    descricao: "In hac habitasse platea dictumst.",
    status: ColunaKanban.IN_PROGRESS
  }
];
