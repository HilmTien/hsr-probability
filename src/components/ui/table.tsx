type TableProps = {
  headerContent: string[];
  tableData: { name: string; data: string[] }[];
};

export default function Table({ headerContent, tableData }: TableProps) {
  return (
    <table
      className={"w-full text-center overflow-x-scroll text-nowrap leading-8"}
    >
      <thead>
        <tr>
          <th></th>
          {headerContent.map((header) => (
            <th className="p-2" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, i) => {
          return (
            <tr key={`row-${i}`}>
              <td className="font-bold">{row.name}</td>
              {row.data.map((cell, j) => (
                <td key={`cell-${i}-${j}`}>{cell}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
