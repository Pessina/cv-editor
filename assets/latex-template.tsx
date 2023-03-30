import { LanguagesEnum, translations } from "./translations";

type Company = {
  name: string;
  duration: string;
  position: string;
  location: string;
  description: string;
};

type Education = {
  field: string;
  duration: string;
  institution: string;
  location: string;
};

type Language = {
  name: string;
};

export type LatexTemplateParams = {
  selectedLanguage?: LanguagesEnum;
  name: string;
  profession: string;
  phone: string;
  email: string;
  introduction: string;
  experience: Company[];
  education: Education[];
  languages: Language[];
};

export const createLatexTemplate = ({
  name,
  profession,
  phone,
  email,
  introduction,
  selectedLanguage = LanguagesEnum.EN,
  experience,
  education,
  languages,
}: LatexTemplateParams): string => {
  return `
\\documentclass[8pt]{resume}
\\usepackage[brazilian]{babel}
\\usepackage[utf8]{inputenc}
\\usepackage{fontawesome}
\\usepackage{hyperref}
\\usepackage[misc]{ifsym}
\\usepackage[left=1.4cm,top=0.3in,right=1.6cm,bottom=0.5in]{geometry}

\\newcommand{\\tit}[1]{\\textit{#1}}
\\newcommand{\\tbf}[1]{\\textbf{#1}}
\\newcommand{\\ttt}[1]{\\texttt{#1}}

\\name{${name}}
\\address{${profession}}
\\address{\\faMobilePhone~${phone} ~~\\Letter~${email}}

\\begin{document}
    ${introduction}

\\begin{rSection}{${translations[selectedLanguage].experience}}
${experience
  .map(
    (company) => `
    \\begin{rSubsection}{${company.name}}{${company.duration}}{${company.position}}{${company.location}}
        ${company.description}
    \\end{rSubsection>
`
  )
  .join("")}
\\end{rSection}

\\begin{rSection}{${translations[selectedLanguage].education}}
${education
  .map(
    (education) => `
    \\begin{rSubsection}{${education.field}}{${education.duration}}{${education.institution}}{${education.location}}
    \\end{rSubsection>
`
  )
  .join("")}
\\end{rSection}

\\begin{rSection}{${translations[selectedLanguage].languages}}
${languages
  .map(
    (language) => `
    \\begin{rSubsection}{${language.name}}{}{}{}
    \\end{rSubsection>
`
  )
  .join("")}
\\end{rSection}
\\end{document}
`;
};
