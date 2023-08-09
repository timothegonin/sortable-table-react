import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";

export const SortableTable = ({ data, tableHeads }) => {
	const userData = data;
	console.log(userData);
	return (
		<Container fluid="md">
			{/* CONTROLS AND TABLE */}
			<Form className="w-100 mb-4 ">
				<Row className="d-flex flex-column-reverse flex-md-row justify-content-between">
					<Col className="col-8 col-md-4 d-flex align-items-center">
						Show
						<Form.Select className="mx-3">
							<option>10</option>
							<option>25</option>
							<option>50</option>
							<option>100</option>
						</Form.Select>
						entries
					</Col>
					<Col className="col-8 mb-3 mb-md-0 col-md-3">
						<Form.Control
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
					</Col>
				</Row>
			</Form>
			{/* <EmployeesTableView /> */}
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						{tableHeads.map((tableHead, index) => (
							<th key={`${index}-${tableHead}`}>{tableHead}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((employee) => (
						<tr key={employee.id}>
							<td>{employee.firstName}</td>
							<td>{employee.lastName}</td>
							<td>{employee.startDate}</td>
							<td>{employee.department}</td>
							<td>{employee.dateOfBirth}</td>
							<td>{employee.street}</td>
							<td>{employee.city}</td>
							<td>{employee.state}</td>
							<td>{employee.zipCode}</td>
						</tr>
					))}
				</tbody>
			</Table>

			{/* INFOS + PAGINATION */}
			<Stack
				direction="horizontal"
				gap={3}
				className="my-3 d-flex flex-column flex-md-row justify-content-md-between"
			>
				<Badge bg="primary">Showing 1 to 1 of 1 entries</Badge>
				<Pagination size="sm" className="md-ms-auto my-auto">
					<Pagination.First />
					<Pagination.Prev />
					<Pagination.Item>{1}</Pagination.Item>
					<Pagination.Ellipsis />

					<Pagination.Item>{10}</Pagination.Item>
					<Pagination.Item>{11}</Pagination.Item>
					<Pagination.Item active>{12}</Pagination.Item>
					<Pagination.Item>{13}</Pagination.Item>
					<Pagination.Item disabled>{14}</Pagination.Item>

					<Pagination.Ellipsis />
					<Pagination.Item>{20}</Pagination.Item>
					<Pagination.Next />
					<Pagination.Last />
				</Pagination>
			</Stack>
		</Container>
	);
};
