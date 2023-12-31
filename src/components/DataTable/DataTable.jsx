import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

/**
 * DataTable component displays a sortable table with data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} data - The data to display in the table.
 * @param {Array} tableHeads - The table header titles.
 * @param {string} searchTerm - The search term to filter the data.
 * @returns {JSX.Element} - The rendered component.
 */
export const DataTable = ({ data, tableHeads, searchTerm }) => {
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

			if (
				new Date(a[propKey]).toString() !== "Invalid Date" &&
				new Date(b[propKey]).toString() !== "Invalid Date"
			) {
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
			return {
				fontWeight: "bold",
				color: "#007bff",
				cursor: "pointer",
			};
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
					{isAscending ? "▲" : "▼"}
				</span>
			);
		}

		return (
			<span className={`rotate-icon invisible`} onClick={() => handleSort(key)}>
				▼
			</span>
		);
	};

	return (
		<Table striped bordered hover responsive>
			<thead>
				<tr>
					{tableHeads.map((tableHead, index) => (
						<th
							className="user-select-none"
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
				{sortedData.length === 0 ? (
					<tr>
						<td
							colSpan={tableHeads.length}
							className="text-center fst-italic py-3"
						>
							No match found
						</td>
					</tr>
				) : (
					sortedData
						.filter((employee) =>
							Object.values(employee).some(
								(value) =>
									typeof value === "string" &&
									value.toLowerCase().includes(searchTerm.toLowerCase())
							)
						)
						.map((employee, index) => (
							<tr key={index}>
								{tableHeads.map((tableHead) => {
									const propName = tableHead.toLowerCase().replace(/ /g, "");
									return (
										<td key={`${index}-${tableHead}`}>{employee[propName]}</td>
									);
								})}
							</tr>
						))
				)}
			</tbody>
		</Table>
	);
};

DataTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	tableHeads: PropTypes.arrayOf(PropTypes.string).isRequired,
	searchTerm: PropTypes.string.isRequired,
};
