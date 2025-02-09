import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://auto-pay-api-sgiognjnfa-uc.a.run.app/auto-pay/get-ui-params";

function App() {
  const [employers, setEmployers] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [searchEmployer, setSearchEmployer] = useState("");
  const [searchJobTitle, setSearchJobTitle] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setEmployers(response.data.employers || []);
        setJobTitles(response.data.jobTitles || []);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
     <header>
      <h1>LOAN MANAGEMENT UI</h1> 
     </header>

      <input
        type="text"
        placeholder="Search Employers..."
        value={searchEmployer}
        onChange={(e) => setSearchEmployer(e.target.value)}
      />
      <EmployersTable employers={employers} searchQuery={searchEmployer} />

      <input
        type="text"
        placeholder="Search Job Titles..."
        value={searchJobTitle}
        onChange={(e) => setSearchJobTitle(e.target.value)}
      />
      <JobTitlesTable jobTitles={jobTitles} searchQuery={searchJobTitle} />
    </div>
  );
}

function EmployersTable({ employers, searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const filteredEmployers = employers.filter(emp =>
    emp.id.toString().includes(searchQuery) ||
    emp.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployers = filteredEmployers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2>Employers</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employer</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployers.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.item}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

function JobTitlesTable({ jobTitles, searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredJobTitles = jobTitles.filter(job =>
    job.id.toString().includes(searchQuery) ||
    job.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobTitles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobTitles = filteredJobTitles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2>Job Titles</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {paginatedJobTitles.map(job => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.item}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
