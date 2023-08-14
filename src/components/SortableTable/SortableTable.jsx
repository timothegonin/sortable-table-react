import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";
import "./style.css";

export const SortableTable = ({ data, tableHeads }) => {
	const [sortedData, setSortedData] = useState(data);
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: "ascending",
	});

	useEffect(() => {
		const normalizedData = data.map((employee) => {
			const normalizedEmployee = {};
			for (const key in employee) {
				if (employee.hasOwnProperty(key)) {
					normalizedEmployee[key.toLowerCase()] = employee[key];
				}
			}
			return normalizedEmployee;
		});

		setSortedData(normalizedData);
	}, [data]);

	const compareDates = (a, b) => {
		const dateA = new Date(a);
		const dateB = new Date(b);

		if (dateA < dateB) return -1;
		if (dateA > dateB) return 1;
		return 0;
	};

	const handleSort = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}

		const sorted = [...sortedData].sort((a, b) => {
			const propKey = key.toLowerCase().replace(/ /g, "");

			if (propKey === "startdate" || propKey === "dateofbirth") {
				return direction === "ascending"
					? compareDates(a[propKey], b[propKey])
					: compareDates(b[propKey], a[propKey]);
			}

			if (a[propKey] < b[propKey]) return direction === "ascending" ? -1 : 1;
			if (a[propKey] > b[propKey]) return direction === "ascending" ? 1 : -1;
			return 0;
		});

		setSortedData(sorted);
		setSortConfig({ key, direction });
	};

	const getSortButtonStyle = (key) => {
		if (sortConfig.key === key) {
			return { fontWeight: "bold", color: "#007bff", cursor: "pointer" };
		}
		return { cursor: "pointer" };
	};

	const getSortButtonIcon = (key) => {
		if (sortConfig.key === key) {
			const isAscending = sortConfig.direction === "ascending";
			const iconClasses = isAscending ? "" : "rotated";

			return (
				<span
					className={`rotate-icon ${iconClasses}`}
					onClick={() => handleSort(key)}
				>
					▼
				</span>
			);
		}
		return "";
	};

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
							<th
								key={`${index}-${tableHead}`}
								onClick={() => handleSort(tableHead)}
								style={getSortButtonStyle(tableHead)}
							>
								{tableHead} {getSortButtonIcon(tableHead)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{sortedData.map((employee, index) => (
						<tr key={index}>
							{tableHeads.map((tableHead) => {
								const propName = tableHead.toLowerCase().replace(/ /g, "");
								return (
									<td key={`${index}-${propName}`}>{employee[propName]}</td>
								);
							})}
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
