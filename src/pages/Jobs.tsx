
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface Job {
  id: string;
  title: string;
  active: boolean;
}

const jobs: Job[] = [
  { id: "1", title: "Professor in School of Law", active: false },
  { id: "2", title: "Associate Professor in School of Law", active: false },
  { id: "3", title: "Professor", active: false },
  { id: "4", title: "Professor in School of Management", active: true },
];

export default function Jobs() {
  return (
    <div className="page-container">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-semibold">Job Listings</h1>
          <Button size="icon" variant="outline">
            <RefreshCw size={16} />
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">View</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch checked={job.active} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Button>
        </div>
      </div>
    </div>
  );
}
