const ListUser = () => {
  return (
    <>
      <h1 className="text-xl font-bold">List Project</h1>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                displayName
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          {/* <tbody>
                    <% listUser.forEach((user)=> {%>
                    <tr className="bg-neutral-primary border-b border-default">
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                            <%= user.id %>
                        </th>
                        <td className="px-6 py-4">
                            <%= user.email %>
                        </td>
                        <td className="px-6 py-4">
                            <%= user.displayName %>
                        </td>
                        <td className="px-6 py-4">
                            <a className="border-b" href="update-page/<%= user.id %>">Edit</a>
                        <form action="/delete-user/<%= user.id %>" method="POST">
                                <button>Delete</button>
                            </form>
                        </td>
                    </tr>
                    <% }) %>
                </tbody> */}
        </table>
      </div>
    </>
  );
};

export default ListUser;
