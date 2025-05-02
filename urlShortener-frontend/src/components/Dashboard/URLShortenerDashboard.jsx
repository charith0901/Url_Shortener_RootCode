import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination
} from '../table/Table';
import { Search, Plus, Edit, Trash } from 'lucide-react';
import apiFetch from '../../api/apiFetch';
import { Link } from 'react-router-dom';

const URLShortenerDashboard = () => {
  const [data, setData] = useState({
    content: [],
    pageable: { pageNumber: 0, pageSize: 10 },
    totalElements: 0,
    totalPages: 0,
  });
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await apiFetch.get('/url', {
        params: { 
          page: page, 
          size: 10, 
          keyword: debouncedQuery,
          sortBy: sortBy
        }
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, debouncedQuery, sortBy]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNewURL = () => {
    setShowModal(true);
  };

  const handleEdit = (id) => {
    console.log(`Edit URL with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this URL?');
    if (confirmDelete) {
      apiFetch.delete(`/url/${id}`)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error('Error deleting URL:', error);
        });
    }
  };

return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
          <div>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">URL Shortener Dashboard</h1>
              </div>
              
              
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              
                <div className="relative flex-1 max-w-md">
                    <Search 
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" 
                    />
                    <input
                        type="text"
                        placeholder="Search URLs..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="h-11 w-full pl-10 pr-4 rounded-xl border
                                            bg-white/50 dark:bg-gray-900/50
                                            text-gray-900 dark:text-gray-100
                                            placeholder:text-gray-500 dark:placeholder:text-gray-400
                                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50
                                            border-gray-200/50 dark:border-gray-700/50
                                            shadow-sm hover:border-gray-300 dark:hover:border-gray-600
                                            transition-all duration-200"
                        title="Search by URL or name"
                    />
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-11 px-4 rounded-xl border bg-white/50 dark:bg-gray-900/50
                                     text-gray-900 dark:text-gray-100 border-gray-200/50 dark:border-gray-700/50
                                     shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
                >
                    <option value="createdAt">Date Created</option>
                    <option value="clicks">Clicks</option>
                    <option value="expiresAt">Expiration</option>
                </select>
                <Link to={"/create"}>
                <button
                    className="h-11 px-6 flex items-center gap-2"
                >
                    <Plus size={16} />
                    New URL
                </button>
                </Link>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 
                                        bg-white/50 dark:bg-gray-900/50
                                        shadow-xl shadow-gray-200/20 dark:shadow-gray-900/30">
                {isLoading ? (
                    "loading"
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                                <TableCell header>Short URL</TableCell>
                                <TableCell header>Original URL</TableCell>
                                <TableCell header>Clicks</TableCell>
                                <TableCell header>Created Date</TableCell>
                                <TableCell header>Expiration</TableCell>
                                <TableCell header>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.content?.map((url) => (
                                <TableRow 
                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-150" 
                                    key={url.alias}
                                >
                                    <TableCell className="font-medium text-blue-600">{url.alias}</TableCell>
                                    <TableCell 
                                        className="truncate max-w-xs" 
                                        title={url.originalUrl}
                                    >
                                        {url.originalUrl.length > 50 
                                            ? `${url.originalUrl.substring(0, 50)}...` 
                                            : url.originalUrl}
                                    </TableCell>
                                    <TableCell>{url.clicks}</TableCell>
                                    <TableCell>{url.createdAt}</TableCell>
                                    <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleEdit(url.id)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(url.alias)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {data.totalPages > 0 && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        currentPage={data.pageable.number}
                        totalPages={data.pageable.totalPages}
                        onPageChange={handlePageChange}
                        title="Navigate through pages"
                    />
                </div>
            )}
            {showModal && <CreateUrl/>}
        </div>
);
};

export default URLShortenerDashboard;